import './actions-container.scss';
export interface ActionsContainerProps {
    children: React.ReactNode;
}
const ActionsContainer = ({ children }: ActionsContainerProps) => {
    return (
        <div className="actions-container">
            {children}
        </div>
    )
}

export default ActionsContainer;