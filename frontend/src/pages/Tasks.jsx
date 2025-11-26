import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Calendar, User } from 'lucide-react';
import { endpoints } from '../config';
import './Tasks.css';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', status: 'Todo', assignee_id: '', due_date: ''
    });

    useEffect(() => {
        fetchTasks();
        fetchEmployees();
    }, []);

    const fetchTasks = () => {
        fetch(endpoints.tasks)
            .then(res => res.json())
            .then(data => setTasks(data.data));
    };

    const fetchEmployees = () => {
        fetch(endpoints.employees)
            .then(res => res.json())
            .then(data => setEmployees(data.data));
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            // Optimistic update
            const newStatus = destination.droppableId;
            const updatedTasks = tasks.map(t =>
                t.id.toString() === draggableId ? { ...t, status: newStatus } : t
            );
            setTasks(updatedTasks);

            // API call
            fetch(`${endpoints.tasks}/${draggableId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(endpoints.tasks, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                setShowModal(false);
                fetchTasks();
                setFormData({ title: '', description: '', status: 'Todo', assignee_id: '', due_date: '' });
            });
    };

    const columns = {
        'Todo': tasks.filter(t => t.status === 'Todo'),
        'In Progress': tasks.filter(t => t.status === 'In Progress'),
        'Done': tasks.filter(t => t.status === 'Done')
    };

    return (
        <div className="tasks-page">
            <header className="page-header flex justify-between items-center">
                <div>
                    <h1 className="text-2xl">Task Board</h1>
                    <p className="text-secondary">Drag and drop tasks to manage workflow</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={18} />
                    New Task
                </button>
            </header>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="kanban-board">
                    {Object.entries(columns).map(([columnId, columnTasks]) => (
                        <div key={columnId} className="kanban-column">
                            <div className="column-header">
                                <h3>{columnId}</h3>
                                <span className="task-count">{columnTasks.length}</span>
                            </div>
                            <Droppable droppableId={columnId}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="task-list"
                                    >
                                        {columnTasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="card task-card"
                                                    >
                                                        <h4>{task.title}</h4>
                                                        <p className="task-desc">{task.description}</p>
                                                        <div className="task-meta">
                                                            {task.assignee_name && (
                                                                <div className="task-assignee" title={task.assignee_name}>
                                                                    <User size={14} />
                                                                    <span>{task.assignee_name.split(' ')[0]}</span>
                                                                </div>
                                                            )}
                                                            {task.due_date && (
                                                                <div className="task-date">
                                                                    <Calendar size={14} />
                                                                    <span>{task.due_date}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal card">
                        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                className="input"
                                placeholder="Task Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                            <textarea
                                className="input"
                                placeholder="Description"
                                rows="3"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                            <div className="flex gap-4">
                                <select
                                    className="input"
                                    value={formData.assignee_id}
                                    onChange={e => setFormData({ ...formData, assignee_id: e.target.value })}
                                >
                                    <option value="">Assign to...</option>
                                    {employees.map(e => (
                                        <option key={e.id} value={e.id}>{e.name}</option>
                                    ))}
                                </select>
                                <input
                                    type="date"
                                    className="input"
                                    value={formData.due_date}
                                    onChange={e => setFormData({ ...formData, due_date: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;
