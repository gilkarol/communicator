export class HttpError extends Error  {
    constructor(public status: number, public errorMessage: string) {
        super(errorMessage)
    }
}