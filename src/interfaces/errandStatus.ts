export interface ErrandStatus {
    Status: Status;
}

export interface Status {
    statusID:                      number;
    name:                          string;
    newExternalMessagesDisallowed: boolean;
    addExternalMessage:            boolean;
    addInternalMessage:            boolean;
    isRestrictedAdminDeletable:    boolean;
    contentType:                   string;
}