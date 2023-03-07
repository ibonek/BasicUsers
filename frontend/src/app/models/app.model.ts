export class APIResponse<T> {
    success!: boolean;
    data?: T;
    message?: any;
    meta?: any;
}

export class User {
    id!: string;
    login!: string;
    pasword!: string;

}

export class Client {
    id!: string;
    name!: string;
    alias!: string;
    timezone!: string;
    country!: string;
    city!: string;
    active!: string;
    services?: Service[];
    _createdAt!: number;
    _updatedAt!: number;
}

export class Service {
    id!: string;
    name!: string;
    provider!: any; // could be just name or json with data
    client!: any; // could be just name or json with data
    apiData?: any;
    active!: boolean;
    soc!: boolean;
    pov!: boolean;
    anonymous!: boolean;
    socThreshold!: number;
    revThreshold!: number;
    socCoverage!: string;
    notes!: string;
    _createdAt!: number;
    _updatedAt!: number;
}

export class Provider {
    id!: string;
    name!: string;
    description!: string;
    requirements!: any;
}


export class Case {
    _id!: string;
    _type!: string;
    _createdBy!: string;
    _updatedBy?: string;
    _createdAt!: number;
    _updatedAt?: number;
    number!: number;
    title!: string;
    description!: string;
    severity!: number;
    startDate!: number;
    endDate?: number;
    tags!: string[];
    flag!: boolean;
    tlp!: number;
    pap!: number;
    status!: string;
    assignee?: string;
    summary?: string;
    impactStatus?: string;
    resolutionStatus?: string;
    customFields!: any[];
    extraData: any;
}

export class Alert {
    id!: string;
    _createdBy!: string;
    _createdAt!: number;
    _updatedAt!: number;
    type!: string;
    service!: string;
    client!: string;
    sourceRef!: string;
    link!: string;
    title!: string;
    description!: string;
    severity!: number;
    tlp!: number;
    pap!: number;
    date!: number;
    assignee!: string;
    status!: string;
    tags!: string[];
    observables!: any[];
    customFields!: any[];
    timeline!: any[];
    case!: any;
}
