import { useConfig } from "@/context/ConfigContext";
import { WidgetWrapper } from "./WidgetWrapper";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function RemindersWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const { config } = useConfig("reminders");
  const [tasks, setTasks] = useState([
    { id: 1, text: String(config.task1), done: false },
    { id: 2, text: String(config.task2), done: false },
    { id: 3, text: String(config.task3), done: true },
    { id: 4, text: String(config.task4), done: true }
  ]);

  useEffect(() => {
    setTasks([
      { id: 1, text: String(config.task1), done: false },
      { id: 2, text: String(config.task2), done: false },
      { id: 3, text: String(config.task3), done: true },
      { id: 4, text: String(config.task4), done: true }
    ]);
  }, [config.task1, config.task2, config.task3, config.task4]);

  const toggle = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const pending = tasks.filter(t => !t.done).length;

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-4 bg-card text-card-foreground">
      <div className="flex gap-2 items-center mb-3">
        <div className="bg-[#FF9500] w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h4 className="font-semibold text-sm">{pending} due today</h4>
      </div>
      <div className="flex flex-col gap-2 flex-1 justify-end">
        {tasks.map(task => (
          <div key={task.id} className="flex gap-2 items-center cursor-pointer" onClick={() => toggle(task.id)}>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${task.done ? 'bg-[#FF9500] border-[#FF9500]' : 'border-muted-foreground/50'}`}>
              {task.done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
            </div>
            <span className={`text-xs truncate font-medium ${task.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
