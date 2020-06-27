import { LogLevel, ILogListener, ILogEntry } from "@pnp/logging";
import { sp } from "@pnp/sp";
import { IWeb, Web } from '@pnp/sp/webs';
import "@pnp/sp/webs";
import "@pnp/sp/site-users";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";

export interface ILogData {
    FileName: string;
    MethodName: string;
    StackTrace: string;
}

export class LogData implements ILogData {
    constructor(
        public FileName: string = "",
        public MethodName: string = "",
        public StackTrace: string = ""
    ) { }
}

export interface ILogItem {
    ApplicationName: string;
    CodeFileName: string;
    MethodName: string;
    LoggedOn: Date;
    LoggedById: number;
    ErrorMessage: string;
    StackTrace: string;
}

export class LogItem implements ILogItem {
    constructor(
        public ApplicationName: string = "",
        public CodeFileName: string = "",
        public MethodName: string = "",
        public LoggedOn: Date = new Date(),
        public LoggedById: number = 0,
        public ErrorMessage: string = "",
        public StackTrace: string = ""
    ) { }
}

export default class CustomLogger implements ILogListener {
    private _applicationName: string;
    private _logListName: string;
    private _web: IWeb;
    private _userId: number;
    private _currentuser: string;
    private _writeLogFailed: boolean;

    constructor(applicationName: string, logWebUrl: string, logListName: string, currentUser: string) {
        //Initialize
        try {
            this._writeLogFailed = false;
            this._applicationName = applicationName;
            this._logListName = logListName;
            this._web = Web(logWebUrl);
            this._currentuser = currentUser;
            //this.init(currentUser);
        } catch (err) {
            console.error(`Error initializing CustomLogger - ${err}`);
        }
    }

    private async init(currentUser: string): Promise<number> {
        //Implement an asyncronous call to ensure the user is part of the web where the ApplicationLog list is and get their user id.
        try {
            let userResult = await this._web.ensureUser(`i:0#.f|membership|${currentUser}`);
            return userResult.data.Id;
            //console.log(this._userId);
        } catch (err) {
            console.error(`Error initializing CustomLogger (init) - ${err}`);
        }
    }

    public async log(entry: ILogEntry): Promise<void> {
        try {
            //If the entry is an error then log it to my Application Log table.  All other logging is handled by the console listener
            if (entry.level == LogLevel.Error) {
                if (!this._writeLogFailed) {
                    this._userId = await this.init(this._currentuser);
                    let stackArray = null;
                    if (entry.data.StackTrace && entry.data.StackTrace.length > 0)
                        stackArray = JSON.stringify(entry.data.StackTrace.split('\n').map((line) => { return line.trim(); }));
                    let newLogItem: LogItem = new LogItem(this._applicationName,
                        entry.data.FileName,
                        entry.data.MethodName,
                        new Date(),
                        this._userId,
                        entry.message,
                        stackArray);
                    sp.web.lists.getByTitle(this._logListName).items.add(newLogItem);
                }
            }
        } catch (err) {
            //Assume writing to SharePoint list failed and stop continuous writing
            this._writeLogFailed = true;
            console.error(`Error logging error to SharePoint list ${this._logListName} - ${err}`);
        }
        return;
    }
}
