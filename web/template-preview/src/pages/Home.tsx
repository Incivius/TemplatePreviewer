import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { createTemplate, getTemplates } from '../services/Templates';
import { TemplateSchema } from '../schemas/Templates';
import FloatingLabelInput from '../components/FloatLabelInput';
import { extractVariables } from '../utils/variables';

const Home = () => {
  const [allTemplates, setAllTemplates] = useState<TemplateSchema[]>([]);
  const [name, setName] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [extractedVariables, setExtractedVariables] = useState<string[]>([]);
  const [variableValues, setVariableValues] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [previewMessage, setPreviewMessage] = useState<string>('');
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState<boolean>(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const templates = await getTemplates();
        setAllTemplates(templates);
        console.log('Templates:', templates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    }

    fetchTemplates();
  }, [variableValues]);

  const handleUpdateName = (newName: string) => {
    setName(newName);
  };

  const handleTemplateClick = (template: TemplateSchema) => {
    setName(template.name || '');
    setText(template.content || '');
    setExtractedVariables([]);
    console.log('Selected template:', template);
  };

  const handleGetVariables = () => {
    const variables = extractVariables(text);
    setExtractedVariables(variables);
    console.log('Extracted variables:', variables);

    const initialValues: { [key: string]: string } = {};
    variables.forEach(variable => {
      initialValues[variable] = '';
    });
    setVariableValues(initialValues);
  };

  const handleVariableChange = (variable: string, value: string) => {
    setVariableValues(prevValues => ({
      ...prevValues,
      [variable]: value,
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePreviewMessage = () => {
    let preview = text;
    const missingValues = Object.keys(variableValues).filter(
      variable => !variableValues[variable]
    );

    if (missingValues.length > 0) {
      setPreviewMessage('Please fill all fields!');
      setIsModalOpen(true);
      return;
    }

    Object.keys(variableValues).forEach(variable => {
      preview = preview.replace(`{{${variable}}}`, variableValues[variable]);
    });
    setPreviewMessage(preview);
    setIsModalOpen(true);
  };

  const saveTemplate = async () => {
    try {
      const newTemplate = {
        name: name,
        content: text,
        variables: extractedVariables,
      };

      await createTemplate(newTemplate);

      const updatedTemplates = await getTemplates();
      setAllTemplates(updatedTemplates);

      setIsSuccessPopupOpen(true);
      setTimeout(() => setIsSuccessPopupOpen(false), 2000);
    } catch (error) {
      console.error('Error saving template:', error);
      setIsErrorPopupOpen(true);
      setTimeout(() => setIsErrorPopupOpen(false), 2000);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        background: '#ECE5DD',
        overflow: 'hidden',
        boxSizing: 'border-box',
        paddingTop: 25,
      }}
    >
      {isSidebarOpen && (
        <Sidebar
          allTemplates={allTemplates}
          onTemplateClick={handleTemplateClick}
          onClose={toggleSidebar}
        />
      )}

      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          style={{
            position: 'absolute',
            top: 10,
            left: 20,
            background: '#25D366',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
            zIndex: 999,
          }}
        >
          ☰
        </button>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        maxHeight: "100%",
                        gap: "20px",
                        padding: "20px",
                        background: "#ECE5DD",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        boxSizing: "border-box",
                        overflowY: "auto",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: "10px",
                        }}
                    >
                        <FloatingLabelInput
                            label="Name"
                            value={name}
                            onChange={handleUpdateName}
                        />
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{
                            width: "100%",
                            minHeight: "50%",
                            border: "1px solid #128c7e",
                            borderRadius: "8px",
                            background: "#D9D9D9",
                            fontSize: "16px",
                            outline: "none",
                            resize: "none",
                            padding: "10px",
                            fontFamily: "sans-serif",
                            boxSizing: "border-box",
                        }}
                        placeholder="Digite algo aqui..."
                    />
                    <button
                        style={{
                            width: 200,
                            minHeight: 40,
                            borderRadius: 10,
                            border: 'none',
                            background: '#25D366',
                            color: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer',
                        }}
                        onClick={handleGetVariables}
                    >
                        Get variables
                    </button>
                    {extractedVariables.length > 0 ? (
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                gap: "10px",
                                background: "#ECE5DD",
                                padding: "10px",
                                borderRadius: 8,
                                border: "1px solid #128c7e",
                                boxSizing: "border-box",
                            }}
                        >
                            {extractedVariables.map((variable, index) => (
                                <FloatingLabelInput
                                    key={index}
                                    label={variable}
                                    value={variableValues[variable] || ""}
                                    onChange={(value) => handleVariableChange(variable, value)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                background: "#ECE5DD",
                                border: "1px solid #128c7e",
                                textAlign: "center",
                                borderRadius: 8
                            }}
                        >
                            <p style={{ color: "#888" }}>Please select variables.</p>
                        </div>
                    )}

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-evenly",
                            gap: 10
                        }}
                    >
                        <button
                            style={{
                                width: 200,
                                minHeight: 40,
                                borderRadius: 10,
                                border: 'none',
                                background: '#25D366',
                                color: '#fff',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                            onClick={handlePreviewMessage}
                        >
                            Preview message
                        </button>
                        <button
                            style={{
                                width: 200,
                                minHeight: 40,
                                borderRadius: 10,
                                border: 'none',
                                background: '#25D366',
                                color: '#fff',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                            onClick={saveTemplate}
                        >
                            Save template
                        </button>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            minWidth: "300px",
                            maxWidth: "600px",
                            textAlign: "center",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Preview Message</h3>
                        <p>{previewMessage}</p>
                    </div>
                </div>
            )}
              {isSuccessPopupOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "200px",
                            textAlign: "center",
                        }}
                    >
                        Template salvo com sucesso!
                    </div>
                </div>
            )}
            {isErrorPopupOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "200px",
                            textAlign: "center",
                        }}
                    >
                        Error saving the template. Please try again!
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
