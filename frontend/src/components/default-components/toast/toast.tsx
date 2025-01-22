import React, { createContext, useContext } from 'react';
import { useToast } from "@chakra-ui/react";
import './toast.scss';
// Define the type of the context
export type ToastContextType = (id: string, title: string, description: string, status: 'success' | 'error' | 'warning' | 'info') => void;

// Create a context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Create a provider component
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const toast = useToast();
    const showToast: ToastContextType = (id, title, description, status) => {
        if (id && toast.isActive(id) === false) {
            toast({
                id,
                title,
                description,
                status
            })
        }
    }

    // Provide the showToast function to children
    return (
        <ToastContext.Provider value={showToast}>
            {children}
        </ToastContext.Provider>
    );
}

export function useShowToast(): ToastContextType {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useShowToast must be used within a ToastProvider');
    }
    return context;
}