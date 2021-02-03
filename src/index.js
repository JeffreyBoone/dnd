import React from 'react'
import ReactDOM from 'react-dom'
import { Dustbin } from './Dustbin';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
};

function App() {
	var namesList = [
		{ name: "ItemOne" },
		{ name: "ItemTwo" },
		{ name: "ItemThree" }
	];

	const [list, setList] = React.useState(namesList);

	const handleRemove = (name) => {
		setList(list.filter(item => item.name !== name));
	};

	const Box = ({ name }) => {
		const [{ isDragging }, drag] = useDrag({
			item: { name, type: ItemTypes.BOX },
			end: (item, monitor) => {
				const dropResult = monitor.getDropResult();
				if (item && dropResult) {
					handleRemove(name);
					alert(`You dropped ${item.name} into ${dropResult.name}!`);
				}
			},
			collect: (monitor) => ({
				isDragging: monitor.isDragging(),
			}),
		});
		const opacity = isDragging ? 0.4 : 1;
		return (<div ref={drag} style={{ ...style, opacity }}>
			{name}
		</div>);
	};

	return (
		<div className="App">
			<DndProvider backend={HTML5Backend}>
				<div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
						<Dustbin />
					</div>
					<div style={{ overflow: 'hidden', clear: 'both' }}>
						{list.map(item => {
							return (
								<Box name={item.name} deleter={handleRemove} />
							);
						})}
					</div>
				</div>
			</DndProvider>
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
