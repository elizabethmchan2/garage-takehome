import { Fragment } from "react/jsx-runtime";
import classNames from "classnames";
import { FieldValues, Path, useFormContext } from "react-hook-form";

type TextInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  rules?: object;
  autoComplete?: string;
};

const TextInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  autoComplete,
  type = "text",
  rules = {},
}: TextInputProps<T>) => {
  const { register, formState, getFieldState } = useFormContext<T>();
  const { error } = getFieldState(name, formState);

  return (
    <Fragment>
      <label
        htmlFor={name}
        className="text-neutral-500 font-light tracking-wide text-xs/tight mb-0.5"
      >
        {label}
      </label>
      <div
        className={classNames(
          "flex items-center overflow-hidden w-full text-black border rounded-lg bg-white h-10",
          {
            "border-neutral-200 hover:border-neutral-300 focus-within:border-neutral-300 focus-within:ring focus-within:ring-neutral-100":
              !error,
            "border-red-300 ring ring-red-100 focus-within:border-red-300 focus-within:ring-red-100":
              !!error,
          }
        )}
      >
        <input
          {...register(name, rules)}
          id={name}
          autoComplete={autoComplete}
          type={type}
          placeholder={placeholder}
          aria-describedby={`${name}-error`}
          aria-invalid={!!error}
          className="placeholder:text-neutral-500 disabled:bg-neutral-100 placeholder:font-light font-light tracking-wide focus:outline-none focus:ring-0 block w-full border-none px-3 h-10 text-base/normal"
        />
      </div>
      <div aria-live="polite" aria-atomic="true" id={`${name}-error`}>
        {error && (
          <span className="text-red-600 font-light text-sm/tight">
            {error.message}
          </span>
        )}
      </div>
    </Fragment>
  );
};

export default TextInput;
