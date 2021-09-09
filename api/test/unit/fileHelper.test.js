import {describe, test, expect, jest} from "@jest/globals";
import fs from 'fs';
import FileHelper from "../../src/fileHelper.js";
import Routes from "../../src/routes.js";

describe('#getFileHelper', () => {
    describe('#getFileHelper', () => {
      test('setSocket should store io instance', async () => {
        const statMock = {
            dev: 16777220,
            mode: 33188,
            nlink: 1,
            uid: 501,
            gid: 20,
            rdev: 0,
            blksize: 4096,
            ino: 86813946,
            size: 129755,
            blocks: 256,
            atimeMs: 1631155754000,
            mtimeMs: 1631155754000,
            ctimeMs: 1631155754000,
            birthtimeMs: 1631155550000,
            atime: '2021-09-09T02:49:14.000Z',
            mtime: '2021-09-09T02:49:14.000Z',
            ctime: '2021-09-09T02:49:14.000Z',
            birthtime: '2021-09-09T02:45:50.000Z'
        }

        const mockUser = 'edudeveloper';
        process.env.USER = mockUser;
        const filename = 'file.png';

        jest.spyOn(fs.promises, fs.promises.readdir.name)
            .mockResolvedValue([filename])

        jest.spyOn(fs.promises, fs.promises.stat.name)
            .mockResolvedValue(statMock)

       const result = await FileHelper.getFilesStatus("/tmp")

        const expectedResult = [
          {
            size: "130 kB",
            lastModified: statMock.birthtime,
            owner: mockUser,
            file: filename
          }
        ]
        expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
        expect(result).toMatchObject(expectedResult)
      })
    })
  });