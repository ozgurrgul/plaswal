import { useState, useEffect, useRef } from "react";

interface LogEntry {
  id: number;
  timestamp: string;
  level: "log" | "warn" | "error" | "info" | "debug";
  message: string;
  args: any[];
}

export const ConsoleOutput = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const logIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Store original console methods
    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug,
    };

    // Create interceptor function
    const createInterceptor = (level: keyof typeof originalConsole) => {
      return (...args: any[]) => {
        // Call original method
        originalConsole[level](...args);

        // Capture the log
        const logEntry: LogEntry = {
          id: logIdRef.current++,
          timestamp: new Date().toLocaleTimeString(),
          level,
          message: args
            .map((arg) =>
              typeof arg === "object"
                ? JSON.stringify(arg, null, 2)
                : String(arg)
            )
            .join(" "),
          args,
        };

        setLogs((prev) => [...prev, logEntry]);
      };
    };

    // Override console methods
    console.log = createInterceptor("log");
    console.warn = createInterceptor("warn");
    console.error = createInterceptor("error");
    console.info = createInterceptor("info");
    console.debug = createInterceptor("debug");

    // Cleanup function to restore original console
    return () => {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      console.info = originalConsole.info;
      console.debug = originalConsole.debug;
    };
  }, []);

  // Auto-scroll to bottom when new logs are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = () => {
    setLogs([]);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesText = log.message
      .toLowerCase()
      .includes(filter.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    return matchesText && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "#ff6b6b";
      case "warn":
        return "#ffa726";
      case "info":
        return "#42a5f5";
      case "debug":
        return "#ab47bc";
      default:
        return "#666";
    }
  };

  const getLevelBadge = (level: string) => {
    const colors = {
      error: "#ff6b6b",
      warn: "#ffa726",
      info: "#42a5f5",
      debug: "#ab47bc",
      log: "#666",
    };

    return (
      <span
        style={{
          backgroundColor: colors[level as keyof typeof colors],
          color: "white",
          padding: "2px 6px",
          borderRadius: "3px",
          fontSize: "10px",
          fontWeight: "bold",
          textTransform: "uppercase",
          marginRight: "8px",
          minWidth: "45px",
          textAlign: "center",
          display: "inline-block",
        }}
      >
        {level}
      </span>
    );
  };

  if (isCollapsed) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          zIndex: 1000,
          backgroundColor: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: "4px",
          padding: "8px",
        }}
      >
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            backgroundColor: "#333",
            color: "white",
            border: "none",
            padding: "4px 8px",
            borderRadius: "3px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          Console ({logs.length})
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        width: "400px",
        height: "250px",
        backgroundColor: "#1a1a1a",
        border: "1px solid #333",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
        fontSize: "12px",
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "8px",
          borderBottom: "1px solid #333",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#2a2a2a",
        }}
      >
        <span style={{ color: "white", fontWeight: "bold", flex: 1 }}>
          Debug Console ({filteredLogs.length})
        </span>
        <button
          onClick={() => setIsCollapsed(true)}
          style={{
            backgroundColor: "transparent",
            color: "#999",
            border: "none",
            cursor: "pointer",
            padding: "2px 4px",
            fontSize: "14px",
          }}
        >
          −
        </button>
      </div>

      {/* Logs */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          overflow: "auto",
          padding: "4px",
        }}
      >
        {filteredLogs.length === 0 ? (
          <div
            style={{
              color: "#666",
              textAlign: "center",
              padding: "20px",
              fontStyle: "italic",
            }}
          >
            No logs to display
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              style={{
                marginBottom: "2px",
                padding: "4px 6px",
                borderRadius: "2px",
                backgroundColor:
                  log.level === "error"
                    ? "#2d1b1b"
                    : log.level === "warn"
                    ? "#2d2617"
                    : "transparent",
                borderLeft: `3px solid ${getLevelColor(log.level)}`,
                wordBreak: "break-word",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    color: "#888",
                    fontSize: "10px",
                    minWidth: "60px",
                    flexShrink: 0,
                  }}
                >
                  {log.timestamp}
                </span>
                {getLevelBadge(log.level)}
                <span
                  style={{
                    color: "white",
                    flex: 1,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {log.message}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
