import { FormControl, FormErrorMessage, FormHelperText, FormLabel, InputGroup, InputRightElement, ResponsiveValue, Textarea as TextAreaChakra, useToast } from "@chakra-ui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Color, FlexGrow, Height, Margin, MaxWidth, MinWidth, Width } from "css-enums";
import React, { useState } from "react";
import { axiosInstance } from "../../../config/axios";
import { getConfig } from "../../../config/config";
import { colors } from "../../../theme/colors";
import { useAuth } from "../../../utils/context/AuthContext";
import { IconButton, IconButtonProps } from "../icon-button/icon-button";
import { GetMessageDto } from "../../../data/dtos/MessageDtos";
import { useShowToast } from "../toast/toast";

export interface TextAreaProps {
    label?: String;
    placeholder?: string;
    isRequired?: boolean;
    isInvalid?: boolean;
    value?: string;
    onChange?: (input: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown?: (input: React.KeyboardEvent<HTMLTextAreaElement>) => void;
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
    isValidInputFormat?: boolean;
    autoComplete?: string;
    unit?: string;
    name?: string;
    height?: string | Height;
    receiverId: string;
    setMessages: React.Dispatch<React.SetStateAction<GetMessageDto[]>>;
    messages: GetMessageDto[];
}

const TextArea = ({ name, unit, height, autoComplete, onKeyDown, defaultValue, margin, id, backgroundColor, flexGrow, label, placeholder, isRequired, isInvalid, value, onChange, helperText, errorText, size, width, minWidth, maxWidth, isDisabled, inputIsDisabled, receiverId, setMessages, messages }: TextAreaProps) => {
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const showToast = useShowToast();
    const auth = useAuth();
    const sendButtonProps: IconButtonProps = {
        fontSize: colors.fontSize,
        color: colors.onPrimaryText,
        background: colors.primary,
        hoverBackground: colors.primaryHover,
        boxShadow: colors.secoundaryBoxShadow,
        startIcon: <PaperAirplaneIcon color={colors.onPrimaryText} height={colors.fontSizeBg} width={colors.fontSizeBg} />,
        text: "Senden",
        isLoading: isLoading,
        onClick: async () => { 
            setIsLoading(true);
            showToast("message-checking", "Nachricht wird geprüft", "Ihre Nachricht ist am Weg, und läuft zuerst noch durch unsere KI-Analyse.", "info");
            let response = await axiosInstance.post(`${getConfig().api.url}/Message`, {Text: inputRef.current?.value, Read: false, SenderId: auth.token?.Employee.Id, ReceiverId: receiverId});
            let data = response.data;
            let newMessage = data as GetMessageDto;
            setMessages([...messages, newMessage]);
            inputRef.current!.value = "";
            setIsLoading(false);
        },
        width: "fit-content",
    };

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
            </div>
            <InputGroup>
                <TextAreaChakra
                    ref={inputRef}
                    name={name}
                    fontWeight={"normal"}
                    autoComplete={autoComplete}
                    defaultValue={defaultValue}
                    id={id}
                    backgroundColor={backgroundColor}
                    isDisabled={inputIsDisabled}
                    borderRadius={colors.borderRadius}
                    color={colors.text}
                    height={height}
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
                    width={"100%"} value={value} onChange={onChange} size={size} placeholder={placeholder} />
                {true &&
                    <InputRightElement height={"100%"} width={"fit-content"} display={"flex"} alignItems={"center"} justifyContent={"center"} paddingRight={"5px"}>
                        <>
                            <IconButton {...sendButtonProps}/>
                        </>
                        {/* {isValidInputFormat === true ?
                            <CheckCircleIcon color={colors.success} height={colors.fontSizeBg} width={colors.fontSizeBg} />
                            :
                            <XCircleIcon color={colors.failure} height={colors.fontSizeBg} width={colors.fontSizeBg} />
                        } */}
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

export default TextArea;