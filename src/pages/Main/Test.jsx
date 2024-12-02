import React, { useState } from 'react';

import Table from "@/layouts/Table/Table";
function ParentComponent() {
  const [showComponent, setShowComponent] = useState(false);
  const handleClick = () => { setShowComponent(true); };
  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      {showComponent && <MyComponent />}
    </div>
  );
}

function MyComponent() {
  return <Table/>;
}


export default ParentComponent;