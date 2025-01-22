import { FormControl, FormLabel, Input as ChakraInput, FormHelperText, FormErrorMessage, ResponsiveValue, InputRightElement, InputGroup } from "@chakra-ui/react";
import { colors } from "../../../theme/colors";
import { Color, FlexGrow, Margin, MaxWidth, MinWidth, Width } from "css-enums";
import './input.scss';
import { IconButton } from "../icon-button/icon-button";
import { CheckCircleIcon, CursorArrowRaysIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

export interface InputProps {
    label?: String;
    placeholder?: string;
    isRequired?: boolean;
    isInvalid?: boolean;
    value?: string;
    onChange?: (input: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (input: React.KeyboardEvent<HTMLInputElement>) => void;
    type?: React.HTMLInputTypeAttribute;
    helperText?: String;
    errorText?: String;
    size?: ResponsiveValue<(string & {}) | "sm" | "md" | "lg">;
    width?: string | Width;
    minWidth?: string | MinWidth;
    maxWidth?: string | MaxWidth;
    flexGrow?: number | string | FlexGrow;
    inputIsDisabled?: boolean;
    isDisabled?: boolean;
    backgroundColor?: Color | string;
    id?: string;
    margin?: string | Margin;
    defaultValue?: string;
    isPassword?: boolean;
    isValidInputFormat?: boolean;
    autoComplete?: string;
    unit?: string;
    name?: string;
}
export function Input({ name, unit, autoComplete, onKeyDown, isValidInputFormat, isPassword, defaultValue, margin, id, backgroundColor, flexGrow, label, placeholder, isRequired, isInvalid, value, onChange, type, helperText, errorText, size, width, minWidth, maxWidth, isDisabled, inputIsDisabled }: InputProps) {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const handleShowPassword = () => {
        setShowPassword(prevValue => prevValue === false);
    }
    return (
        <FormControl isDisabled={isDisabled} margin={margin} flexGrow={flexGrow} width={width} minWidth={minWidth} maxWidth={maxWidth} isRequired={isRequired} isInvalid={isInvalid} style={{ display: "flex", flexDirection: "column" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    flexWrap: "wrap"
                }}
            >
                <FormLabel
                    fontSize={size === "sm" ? "14px" : undefined}
                    htmlFor={id}
                    marginBottom={"0px"}
                >
                    {label}{unit !== undefined && <span style={{ marginLeft: "3px", fontSize: size === "sm" ? "12px" : "14px", background: colors.lightgrey, padding: "1px 2px", borderRadius: colors.borderRadius, boxShadow: colors.secoundaryBoxShadow }}>{unit}</span>}
                </FormLabel>

                {isPassword === true && <IconButton
                    margin="-10px 0px 0px -12px"
                    text={`Passwort ${showPassword === true ? "verbergen" : "anzeigen"}`}
                    background={"transparent"}
                    boxShadow={"none"}
                    color={colors.secondary}
                    hoverBackground="transparent"
                    onClick={handleShowPassword}
                    startIcon={
                        <CursorArrowRaysIcon
                            color={colors.secondary}
                            height={colors.fontSizeBg}
                            width={colors.fontSizeBg} />}
                    fontSize={size === "sm" ? "14px" : undefined} />}
            </div>
            <InputGroup>
                <ChakraInput
                    ref={inputRef}
                    name={name}
                    fontWeight={"normal"}
                    autoComplete={isPassword === true ? "current-password" : autoComplete}
                    defaultValue={defaultValue}
                    id={id}
                    backgroundColor={backgroundColor}
                    isDisabled={inputIsDisabled}
                    borderRadius={colors.borderRadius}
                    color={colors.text}
                    _active={{
                        boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 3px 0px, rgba(0, 0, 0, 0.09) 0px 1px 2px 0px",
                        borderColor: colors.secondary,
                    }}
                    boxShadow={"rgba(0, 0, 0, 0.15) 0px 1px 3px 0px, rgba(0, 0, 0, 0.09) 0px 1px 2px 0px"}
                    _focus={{
                        boxShadow: "rgba(0, 0, 0, 0.15) 0px 1px 3px 0px, rgba(0, 0, 0, 0.09) 0px 1px 2px 0px",
                        borderColor: colors.secondary
                    }}
                    onKeyDown={onKeyDown}
                    type={isPassword === true ? (showPassword === true ? "text" : "password") : type} width={"100%"} value={value} onChange={onChange} size={size} placeholder={placeholder} />
                {isValidInputFormat !== undefined && inputRef.current?.value &&
                    <InputRightElement height={"100%"}>
                        {isValidInputFormat === true ?
                            <CheckCircleIcon color={colors.success} height={colors.fontSizeBg} width={colors.fontSizeBg} />
                            :
                            <XCircleIcon color={colors.failure} height={colors.fontSizeBg} width={colors.fontSizeBg} />
                        }
                    </InputRightElement>
                }
            </InputGroup>
            {!isInvalid ? (
                <FormHelperText fontSize={size === "sm" ? "14px" : undefined} marginTop={"3px"}>{helperText}</FormHelperText>
            ) : (
                <FormErrorMessage fontSize={size === "sm" ? "14px" : undefined} marginTop={"3px"}>{errorText}</FormErrorMessage>
            )}
        </FormControl>
    );
}