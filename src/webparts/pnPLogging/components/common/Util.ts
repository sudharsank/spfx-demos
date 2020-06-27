import { LogLevel, ILogEntry, Logger } from '@pnp/logging';
import { ILogData } from './CustomLogger';

export function writeErrorLog(filename: string, methodname: string, stack: string, loglevel: LogLevel, err: any) {
    let data: ILogData = { FileName: filename, MethodName: methodname, StackTrace: stack };
    let logEntry: ILogEntry = { message: `${err.message}`, level: loglevel, data: data };
    Logger.log(logEntry);
}