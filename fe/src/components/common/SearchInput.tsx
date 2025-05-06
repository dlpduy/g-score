import { InputHTMLAttributes, useEffect, useRef } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  shortcutHint?: boolean;
    searchKeyword?: string;
    setSearchKeyword?: (keyword: string) => void;
}

export default function SearchInput({
  shortcutHint = true,
  ...props
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
    const { setSearchKeyword } = props as SearchInputProps & {
        searchKeyword: string;
        setSearchKeyword: (keyword: string) => void;
    };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="fill-gray-500 dark:fill-gray-400"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
          />
        </svg>
      </span>
      <input
        ref={inputRef}
        {...props}
        className="pl-12 pr-14 py-2.5 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-500"
      />
      {shortcutHint && (
        <button 
        onClick={() => {
            setSearchKeyword(inputRef.current?.value || "")
        }}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-gray-500 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-white/[0.03] rounded-md">
          Tìm kiếm
          
        </button>
      )}
    </div>
  );
}
