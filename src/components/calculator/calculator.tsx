"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Delete, Eraser, ListCollapse, Trash2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

type ID = number;

type Grade = {
  id: ID;
  value: number;
};

export const Calculator: React.FC = () => {
  const [grades, setGrades] = React.useState<Grade[]>([]);
  const [gradesToRemove, setGradesToRemove] = React.useState<ID[]>([]);

  const addGrade = (grade: number) => {
    setGrades((prev) => [...prev, { id: Math.random(), value: grade }]);
  };

  const removeGrade = (id: ID) => {
    setGradesToRemove((prev) => [...prev, id]);
    setTimeout(() => {
      setGrades((prev) => prev.filter((g) => g.id !== id));
      setGradesToRemove((prev) => prev.filter((g) => g !== id));
    }, 295); // Duration of the fade-out animation
  };

  const removeLastGrade = () => {
    const lastGrade = grades.toReversed().find((g) => !gradesToRemove.includes(g.id));
    if (lastGrade) removeGrade(lastGrade.id);
  };

  const clearGrades = () => {
    setGradesToRemove(grades.map((g) => g.id));
    setTimeout(() => {
      setGrades([]);
      setGradesToRemove([]);
    }, 295); // Duration of the fade-out animation
  };

  const average = useMemo(() => {
    const filteredGrades = grades.filter((g) => !gradesToRemove.includes(g.id));
    if (filteredGrades.length === 0) return 0;
    return filteredGrades.reduce((sum, b) => sum + b.value, 0) / filteredGrades.length;
  }, [gradesToRemove, grades]);

  return (
    <div className={"h-full w-full max-w-[500px] flex flex-col gap-3 px-2"}>
      <div className="flex flex-grow" />
      <div className={"flex justify-between items-center"}>
        <h2 className={"text text-slate-600 text-2xl"}>{average.toFixed(2)}</h2>
        <h1 className={"text-6xl"}>{Math.round(average)}</h1>
      </div>
      <div className="grid h-[60dvh] max-h-80 grid-cols-3 gap-1">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
          <Button
            key={i}
            variant={"outline"}
            className={"h-full text-md"}
            onClick={() => addGrade(i)}
          >
            {i}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1">
        <Button variant={"secondary"} onClick={removeLastGrade}>
          <Delete className="mr-2 h-4 w-4" />
          Відмінити
        </Button>
        <Button variant={"destructive"} onClick={clearGrades}>
          <Eraser className="mr-2 h-4 w-4" />
          Скинути
        </Button>
      </div>
      <div className={"mb-5"}>
        <Drawer>
          <div className="flex justify-between items-stretch">
            <ul className={"w-full flex items-center gap-2 text-slate-600 overflow-x-auto"}>
              {grades.toReversed().map((grade) => {
                const isRemoved = gradesToRemove.includes(grade.id);
                const width = grade.value > 9 ? "20px" : "14px";
                return (
                  <li
                    key={`${grade.value}-${grade.id}`}
                    className={`duration-300 fill-mode-forwards ease-in-out ${isRemoved ? "animate-shrink-out" : "animate-shrink-in"}`}
                    // @ts-expect-error - CSS property
                    style={{ "--animate-element-width": width, "--animate-element-gap": `-8px` }}
                  >
                    {grade.value}
                  </li>
                );
              })}
            </ul>

            <div
              className={"w-8 -ml-5 -mr-2 bg-gradient-to-r from-transparent to-background z-10"}
            ></div>

            <DrawerTrigger asChild>
              <Button variant="link">
                <ListCollapse className="mr-2 h-4 w-4" />
                Список
              </Button>
            </DrawerTrigger>
          </div>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Список оцінок</DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <ul className="w-full max-h-[50dvh] flex flex-col gap-2 overflow-x-auto">
                  {grades.toReversed().map((grade) => {
                    const isRemoved = gradesToRemove.includes(grade.id);
                    const height = "50px";
                    return (
                      <li
                        key={`${grade.value}-${grade.id}`}
                        className={cn(
                          "flex items-center justify-between rounded-md p-1 pl-3 text-md border border-input-800",
                          isRemoved &&
                            "duration-300 fill-mode-forwards ease-in-out animate-collapse-out",
                        )}
                        style={{
                          // @ts-expect-error - CSS property
                          "--animate-element-height": height,
                          "--animate-element-gap": `-18px`,
                        }}
                      >
                        <p>{grade.value}</p>
                        <Button
                          variant={"destructive"}
                          className={"text-sm"}
                          onClick={() => removeGrade(grade.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Скасувати</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};
