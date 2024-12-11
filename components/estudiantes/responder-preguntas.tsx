"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Simple toast function (replace with your actual implementation)
const toast = (message: string) => {
  alert(message);
};

const FormSchema = z.object({
  questions: z.array(z.string()).length(12),
});

export default function PreguntasForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      questions: Array(12).fill(""),
    },
  });


  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(JSON.stringify(data, null, 2));
  }

  const radioGroupOptions = [
    "Excelente",
    "Mucha",
    "Normal",
    "Casi nula",
    "Nula",
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {[...Array(12)].map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`questions.${index}`}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Pregunta {index + 1}:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {radioGroupOptions.map((option) => (
                      <FormItem
                        key={option}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={option} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}