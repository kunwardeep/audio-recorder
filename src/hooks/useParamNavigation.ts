import { useCallback } from "react";
import {
  NavigateOptions,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const PARAMS = { USER: "user" };

const USE_PARAMS = [PARAMS.USER];

const useParamNavigation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return useCallback(
    (path: string, options?: NavigateOptions) => {
      const paramsToKeep = new Map<string, string>();

      USE_PARAMS.forEach((param) => {
        const value = searchParams.get(param);
        if (value) {
          paramsToKeep.set(param, value);
        }
      });

      const url = new URL(path, window.location.origin);

      Array.from(paramsToKeep).forEach(([k, v]) => {
        url.searchParams.set(k, v);
      });

      // Object.entries(paramsToKeep).forEach(([key, value]) => {
      //   url.searchParams.set(key, value);
      // });

      // Navigate to the new URL
      navigate(`${url.pathname}${url.search}`, options);
    },
    [navigate, searchParams]
  );
};

export default useParamNavigation;
