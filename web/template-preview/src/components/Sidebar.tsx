import { TemplateSchema } from "../schemas/Templates";

interface Props {
    allTemplates: TemplateSchema[];
    onTemplateClick: (template: TemplateSchema) => void;
    onClose: () => void;
}

const Sidebar = ({ allTemplates, onTemplateClick, onClose }: Props) => {
    const handleCreateTemplate = () => {
        const template: TemplateSchema = {
            id: "",
            name: "",
            content: "",
            variables: [],
        };
        onTemplateClick(template);
    };

    return (
        <div
            style={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                left: 0,
                paddingTop: 20,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: 300,
                background: '#075E54',
                minWidth: 300,
                height: '100vh',
                zIndex: 9999,
            }}
        >
            <button
                style={{
                    alignSelf: 'flex-end',
                    marginRight: 10,
                    marginBottom: 20,
                    border: 'none',
                    background: 'transparent',
                    color: 'white',
                    fontSize: '18px',
                    cursor: 'pointer',
                }}
                onClick={onClose}
            >
                X
            </button>
            <button
                style={{
                    width: 200,
                    height: 40,
                    borderRadius: 10,
                    border: 'none',
                    background: '#25D366',
                    color: '#fff',
                    fontSize: '14px',
                    cursor: 'pointer',
                }}
                onClick={handleCreateTemplate}
            >
                Create new template
            </button>
            <div
                style={{
                    marginTop: 20,
                    width: '80%',
                    height: 'calc(100% - 60px)',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                }}
            >
                {allTemplates.map((template) => (
                    <div
                        key={template.id}
                        style={{
                            padding: '10px 15px',
                            borderBottom: '1px solid white',
                            cursor: 'pointer',
                        }}
                        onClick={() => onTemplateClick(template)}
                    >
                        <h3
                            style={{
                                margin: 0,
                                color: 'white',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                fontSize: '16px',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                position: 'relative',
                                paddingBottom: 8,
                                paddingTop: 8,
                            }}
                        >
                            {template.name}
                            <span
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    width: '80px',
                                    height: '100%',
                                    background: 'linear-gradient(to left, #075E54, transparent)',
                                }}
                            ></span>
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
