import React from "react";

interface SwitchProps {

}

const Switch: React.FC<SwitchProps> = props => {
    return <div className="switch">
        <input type="checkbox" className="switch__field" />
    </div>
}

export default Switch