export interface File {
    name: string;
    path: string;
    id: string;
}

export type Files = File[];

export interface QRData{
    type: "qr" | "connection";
    status: "connected" | "disconnected" | "pending";
    qr: string;
}
