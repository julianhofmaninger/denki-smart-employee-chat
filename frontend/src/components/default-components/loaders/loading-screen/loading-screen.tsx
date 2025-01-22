import { motion } from "framer-motion";
import React from "react";
import './loading-screen.scss';
export interface LoadingScreenProps {
    text: string;
    fontSize?: string;
}
const transitionTime = 700;
export const LoadingScreen = ({ text, fontSize }: LoadingScreenProps) => {
    const [progress, setProgess] = React.useState<1 | 0>(0);
    React.useEffect(() => {
        const id = setInterval(() => {
            setProgess((prevCount: 1 | 0) => {
                if (prevCount === 0) { return 1 }
                else return 0;
            });
        }, transitionTime);
        // Clean up the interval on unmount
        return () => {
            clearInterval(id);
        };
    }, [])

    return (
        <motion.div
            className={"loading-screen-container"}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{ opacity: { duration: 0.1 } }}
        >
            <div className="loading-screen-text-container">
                <div
                    className="loading-screen-text-progress"
                    style={{
                        opacity: progress,
                        transition: `all ${transitionTime}ms ease`,
                        fontSize: fontSize
                    }}
                >
                    {text}
                </div>
                <div style={{ fontSize: fontSize }} className="loading-screen-text">{text}</div>
            </div>
        </motion.div>
    );
};