export interface User {
    userID: number;
    firstname: string;
    lastname: string;
    email: string;
    admin: boolean;
    enabled: boolean;
    lastLogin: string;
    lastLoginInMilliseconds: number;
    added: string;
    isMutable: boolean;
    hasFormProvider: boolean;
}

export interface Poster {
    user: User;
}

export interface User2 {
    userID: number;
    firstname: string;
    lastname: string;
    email: string;
    admin: boolean;
    enabled: boolean;
    lastLogin: string;
    lastLoginInMilliseconds: number;
    added: string;
    isMutable: boolean;
    hasFormProvider: boolean;
}

export interface Editor {
    user: User2;
}

export interface FlowInstance {
    flowInstanceID: number;
    added: string;
    updated: string;
    firstSubmitted: string;
    fullyPopulated: boolean;
    stepID: number;
    lastStatusChange: string;
    profileID: number;
    remote: boolean;
    addedInMilliseconds: number;
    updatedInMilliseconds: number;
    firstSubmittedInMilliseconds: number;
    lastStatusChangeInMilliseconds: number;
    poster: Poster;
    editor: Editor;
}

export interface FlowInstances {
    FlowInstance: FlowInstance[];
}

export interface OpenEFlowInstanceList {
    FlowInstances: FlowInstances;
}

