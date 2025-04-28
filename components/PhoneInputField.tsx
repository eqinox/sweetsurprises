"use client";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface PhoneInputFieldProps {
  // eslint-disable-next-line
  field: ControllerRenderProps<any, "phone">; // generic support
}

export default function PhoneInputField({ field }: PhoneInputFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <FormItem>
      <FormLabel>Телефон</FormLabel>
      <FormControl>
        <div className="flex">
          <span className="bg-gray-300 border border-r-0 border-input px-2 pt-2 rounded-l-md text-muted-foreground text-sm select-none">
            +359
          </span>
          <Input
            {...field}
            ref={inputRef}
            type="tel"
            className="rounded-l-none"
            value={(field.value || "").replace(/^\+?3590?/, "")} // Strip +359 and leading 0 from value
            onChange={(e) => {
              let raw = e.target.value;
              raw = raw.replace(/\D/g, ""); // Remove non-digit chars
              if (raw.startsWith("0")) {
                raw = raw.slice(1);
              }
              field.onChange(`+359${raw}`);
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Backspace" &&
                inputRef.current?.selectionStart === 0
              ) {
                e.preventDefault();
              }
            }}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
