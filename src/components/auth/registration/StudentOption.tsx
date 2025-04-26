
import React from 'react';
import { Control } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";

interface StudentOptionProps {
  control: Control<any>;
}

export const StudentOption = ({ control }: StudentOptionProps) => {
  return (
    <Card className="p-4 border-2 border-primary/20 bg-primary/5">
      <FormField
        control={control}
        name="isStudent"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2 space-y-0">
            <div className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-lg font-semibold">
                I am a student looking for IT career guidance
              </FormLabel>
            </div>
            <p className="text-sm text-muted-foreground ml-6">
              Students get access to our upcoming resume services and career guidance.
              You can use your Gmail or university email to register.
            </p>
          </FormItem>
        )}
      />
    </Card>
  );
};

