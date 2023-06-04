"use client";

import {useQRCode} from "next-qrcode";
import {useEffect, useState} from "react";
import {QR_SOCKET_URL} from "@/api/urls";
import {useRouter} from "next/navigation";
import {QRData} from "@/api/models";

export default function Login() {
    const {Canvas} = useQRCode();
    const router = useRouter();

    const [qr, setQR] = useState(null);
    const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        const ws = new WebSocket(QR_SOCKET_URL);

        ws.onmessage = ({data}) => {
            const qr_data = JSON.parse(data) as QRData;

            if (qr_data.type === "qr")
                setQR(data.qr);

            if (qr_data.type === "connection" && qr_data.status === "connected")
                router.replace("/");

            if (qr_data.type === "connection" && qr_data.status === "disconnected")
                setMessage("Login Failed");
        };

        ws.onerror = () => setMessage("Server Error");
        ws.onclose = () => setMessage("Network Error");

        return () => ws.close();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            {qr ?
                <Canvas
                    text={'https://github.com/bunlong/next-qrcode'}
                    options={{
                        level: 'M',
                        margin: 3,
                        scale: 4,
                        width: 200,
                        color: {
                            dark: '#000000',
                            light: '#ffffff',
                        },
                    }}
                /> :
                <div className="flex items-center justify-center bg-gray-700"
                     style={{width: "200px", height: "200px"}}>
                    <p className="text-white">{message}</p>
                </div>
            }
            <p className="p-5">Scan With Telegram To Login</p>
        </div>
    )
}
