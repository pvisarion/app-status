export type Process = {
    name: string;
    device: string;
    path: string;
    status: "available" | "scheduled"
}