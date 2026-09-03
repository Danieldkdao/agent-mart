"use client";

import { useEffect } from "react";

import { AGENTMART_WEBMCP_TOOLS } from "@/features/webmcp/tools";
import { useAgentMartStore } from "@/store";

const isAbortError = (error: unknown) =>
  error instanceof DOMException && error.name === "AbortError";

export const WebMCP = () => {
  const hasHydrated = useAgentMartStore((state) => state.hasHydrated);

  useEffect(() => {
    const modelContext = document.modelContext;

    if (!hasHydrated || !modelContext) {
      return;
    }

    const registration = new AbortController();

    const registerTools = async () => {
      for (const tool of AGENTMART_WEBMCP_TOOLS) {
        await modelContext.registerTool(tool, {
          signal: registration.signal,
        });
      }
    };

    void registerTools().catch((error: unknown) => {
      if (!registration.signal.aborted && !isAbortError(error)) {
        console.warn("AgentMart could not register its WebMCP tools.", error);
      }
    });

    return () => registration.abort();
  }, [hasHydrated]);

  return null;
};
