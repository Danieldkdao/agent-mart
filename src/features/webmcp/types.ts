export type JsonSchema = Readonly<Record<string, unknown>>;

export type WebMCPToolAnnotations = {
  readOnlyHint: boolean;
  untrustedContentHint: boolean;
};

export type WebMCPExecutionOptions = {
  signal?: AbortSignal;
};

export type WebMCPTool = {
  name: string;
  title: string;
  description: string;
  inputSchema?: JsonSchema;
  annotations: WebMCPToolAnnotations;
  execute: (
    input: Record<string, unknown>,
    options?: WebMCPExecutionOptions,
  ) => unknown | Promise<unknown>;
};

export type WebMCPRegisterOptions = {
  signal?: AbortSignal;
};

export type WebMCPModelContext = {
  registerTool: (
    tool: WebMCPTool,
    options?: WebMCPRegisterOptions,
  ) => Promise<undefined>;
};

declare global {
  interface Document {
    readonly modelContext?: WebMCPModelContext;
  }
}
