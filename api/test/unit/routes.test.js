import {describe, test, expect, jest} from "@jest/globals";
import Routes from "../../src/routes.js";

describe('#Routes suite test', () => {
   const defaultParams = {
        request: {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: '',
          body:{}
        },
        response:{
          setHeader: jest.fn(),
          writeHeader: jest.fn(),
          end: jest.fn()
        },
        values: () => Object.values(defaultParams)
      }
    describe('#setSocketInstance', () => {
      test('setSoket should store io instance', () => {
        const routes = new Routes()
        const ioObj = {
          to: (id) => ioObj,
          emit: (event, message) => {}
        }
        routes.setSocketInstance(ioObj);
        expect(routes.io).toStrictEqual(ioObj)
      });
    });
    describe('#handler', () => {

      test('#given an inexistent route it should choose default route', async () => {
        const routes = new Routes();
        const params = {
          ...defaultParams
        }
        params.request.method = 'inexistent';
        await routes.handler(...params.values());
        expect(params.response.end).toHaveBeenCalledWith('Hello')
      })

      test('#it should set any request with CORS enabled', async () => {
        const routes = new Routes();
        const params = {
          ...defaultParams
        }
        params.request.method = 'inexistent';
        await routes.handler(...params.values());
        expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin','*')
      })

      test('given method OPTIONS it should choose options route', async () => {
            const routes = new Routes()
            const params = {
                ...defaultParams
            }

            params.request.method = 'OPTIONS'
            await routes.handler(...params.values())
            expect(params.response.writeHeader).toHaveBeenCalledWith(204)
            expect(params.response.end).toHaveBeenCalled()
        });

      test('#given method POST it should choose post route', async () => {
        const routes = new Routes();
        const params = {
          ...defaultParams
        }
            params.request.method = 'POST';
            jest.spyOn(routes, routes.post.name).mockResolvedValue()
            await routes.handler(...params.values());
            expect(routes.post).toHaveBeenCalled()

      })

      test('#given method GET it should choose get route', async () => {
        const routes = new Routes()
        const params = {
          ...defaultParams
        }
        jest.spyOn(routes, routes.get.name).mockResolvedValue()
        params.request.method = 'GET'
        await routes.handler(...params.values())
        expect(routes.get).toHaveBeenCalled()

      });
    });

    describe('#get', () => {
       test('#given method GET it should list all files downloaded', async () => {
         const route = new Routes();
         const params = {
           ...defaultParams
         }
          const filesStatusesMock = [
          {
            size: "130 kB",
            lastModified: '2021-09-09T02:45:50.000Z',
            owner: 'edudeveloper',
            file: 'file.png'
          }
        ]
        jest.spyOn(route.fileHelper, route.fileHelper.getFilesStatus.name)
            .mockResolvedValue(filesStatusesMock)
        params.request.method = 'GET'
        await route.handler(...params.values())
        expect(params.response.writeHeader).toHaveBeenCalledWith(200)
        expect(params.response.end).toHaveBeenCalledWith(JSON.stringify(filesStatusesMock))
      });
    });
  });
