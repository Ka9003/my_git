import React from 'react';

function App() {
    return (
        <div>
            <Header/>
            <Content/>
        </div>
    );
}
function Header() {
    return (
        <div>
            <h1>Header2</h1>
        </div>
    );
}
function Content() {
    return (
        <div>
            <h2>Content2</h2>
            <p>The content text!!!</p>
        </div>
    );
}
export default App;