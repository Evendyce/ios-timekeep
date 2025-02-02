export const formatError = (err: unknown): string => {
    if (err instanceof Error) {
        return err.message;
    }
    return "An unknown error occurred.";
};
