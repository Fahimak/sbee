import React, { InputHTMLAttributes, forwardRef } from "react";
import classNames from "classnames";

import { montserrat } from "@app/shared/fonts";
import styles from "./styles.module.css";

type InputSize = "large" | "medium" | "small";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  classNameInput?: string;
  endIcon?: React.ReactElement;
  inputSize?: InputSize;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ className, classNameInput, endIcon, inputSize, ...props }, ref) => {
    const _defaultInputSize = inputSize || "medium";

    const classNamesContainer = classNames(
      styles.inputContainer,
      styles[_defaultInputSize],
      className
    );

    const classNamesInput = classNames(
      montserrat.className,
      styles.input,
      classNameInput
    );

    return (
      <div className={classNamesContainer}>
        <input type="text" className={classNamesInput} {...props} ref={ref} />
        {!!endIcon ? <span className={styles.endIcon}>{endIcon}</span> : null}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
