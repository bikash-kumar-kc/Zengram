import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

const queryclient = new QueryClient();
const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryclient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
