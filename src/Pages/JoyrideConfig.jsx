import React, { createContext, useContext, useState } from "react";
import Joyride from "react-joyride";

// Crear el contexto
const JoyrideContext = createContext();

// Proveedor del contexto
export const JoyrideProvider = ({ children }) => {
  const [run, setRun] = useState(true); // Controla si el recorrido está activo
  const [currentStep, setCurrentStep] = useState(0); // Paso actual
  const [showPresupuesto, setShowPresupuesto] = useState(false); // Visibilidad de componentes

  const steps = [
    {
      target: "#addPresupuesto",
      content: "Haz clic aquí para agregar un presupuesto.",
    },
    {
      target: "#presupuestoForm",
      content: "Completa el formulario y guarda tu presupuesto.",
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { index, action, status } = data;

    if (status === "finished" || status === "skipped") {
      setRun(false); // Finaliza el recorrido
    }

    if (action === "next") {
      setCurrentStep(index + 1); // Avanza al siguiente paso
      if (index === 0) {
        setShowPresupuesto(true); // Muestra el segundo componente
      }
    }
  };

  return (
    <JoyrideContext.Provider
      value={{
        run,
        steps,
        currentStep,
        setCurrentStep,
        setRun,
        setShowPresupuesto,
        showPresupuesto,
        handleJoyrideCallback,
      }}
    >
      <Joyride
        steps={steps}
        run={run}
        callback={handleJoyrideCallback}
        continuous
        showSkipButton
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      {children}
    </JoyrideContext.Provider>
  );
};

// Hook para usar el contexto
export const useJoyride = () => useContext(JoyrideContext);
