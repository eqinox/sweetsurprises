"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMultiStepForm } from "./form-context";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { bookingSchema } from "@/validation/bookingSchema";
import { format, isBefore, startOfDay } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import BookingSteps from "../booking-steps";
import { useService } from "@/context/service";
import { Services } from "@/types/service";
import { useEffect, useState } from "react";
import { getReservationsByDate } from "@/actions/reservation-actions";

const step1Schema = bookingSchema.pick({
  service: true,
  date: true,
  time: true,
});
type Step1Data = z.infer<typeof step1Schema>;

export default function Step1({ onNext }: { onNext: () => void }) {
  const { formData, setFormData } = useMultiStepForm();

  const { setService, service } = useService();

  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  let defaultService = service;
  if (!!formData.service) {
    defaultService = formData.service;
  }
  const form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      service: defaultService,
      date: formData.date,
      time: formData.time,
    },
  });

  useEffect(() => {
    const fetchBookedTimes = async () => {
      const selectedDate = form.watch("date");
      const selectedService = form.watch("service");

      if (!selectedDate || !selectedService) return;

      const reservations = await getReservationsByDate(
        selectedDate,
        selectedService
      );

      const times = reservations
        .filter((res) => res.status !== 3) // Exclude rejected
        .map((res) => res.time)
        .filter((t): t is string => !!t); // Filter out undefined/null

      setBookedTimes(times);
    };

    fetchBookedTimes();
  }, [form.watch("date"), form.watch("service")]);

  const onSubmit = (values: Step1Data) => {
    setFormData(values); // update context
    onNext(); // move to next step
  };

  const isTimeInPast = (timeString: string): boolean => {
    const selectedDate = form.watch("date");
    if (!selectedDate) return false;

    const now = new Date();
    const selected = new Date(selectedDate);

    const [hours, minutes] = timeString.split(":").map(Number);
    selected.setHours(hours, minutes, 0, 0);

    // Only compare if selected date is today
    const isToday = now.toDateString() === selectedDate.toDateString();

    return isToday && selected < now;
  };

  const times = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-pink-200/80 p-4 border-pink-200 border-2 rounded max-w-96"
      >
        <BookingSteps currentStep={1} />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Услуга</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value); // updates the form
                    setService(value); // updates context state
                  }}
                >
                  <SelectTrigger
                    id="service"
                    className="bg-transparent focus:bg-transparent autofill:!bg-transparent w-full [&>svg]:!text-pink-900"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-pink-200 border-pink-900">
                    <SelectItem
                      className="data-[highlighted]:bg-pink-300 data-[highlighted]:text-white"
                      value={Services.Manicure}
                    >
                      {Services.Manicure}
                    </SelectItem>
                    <SelectItem
                      className="data-[highlighted]:bg-pink-300 data-[highlighted]:text-white"
                      value={Services.Solarium}
                    >
                      {Services.Solarium}
                    </SelectItem>
                    <SelectItem
                      className="data-[highlighted]:bg-pink-300 data-[highlighted]:text-white"
                      value={Services.Massage}
                    >
                      {Services.Massage}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Избери Дата</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal hover:bg-transparent bg-inherit border-pink-900"
                    >
                      {field.value
                        ? format(field.value, "PPP")
                        : "Изберете дата"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-pink-900 rounded">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(day) =>
                        isBefore(startOfDay(day), startOfDay(new Date()))
                      }
                      className="bg-pink-200"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Избери начален час</FormLabel>
              <FormControl>
                <ul className="flex flex-row flex-wrap gap-2">
                  {times.map((time, index) => {
                    const isBooked = bookedTimes.includes(time);
                    const isPast = isTimeInPast(time);
                    const isDisabled = isBooked || isPast;
                    const isSelected = field.value === time;

                    return (
                      <li
                        key={index}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={isDisabled ? -1 : 0}
                        onClick={() => {
                          if (!isDisabled) field.onChange(time);
                        }}
                        className={`border-[1px] rounded px-2 py-1 border-pink-900 
        ${
          isDisabled
            ? "bg-gray-300 opacity-20 cursor-not-allowed"
            : "cursor-pointer"
        } 
        ${isSelected ? "bg-pink-900 text-white" : ""}`}
                      >
                        {time}
                      </li>
                    );
                  })}
                </ul>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Следваща стъпка
        </Button>
      </form>
    </Form>
  );
}
