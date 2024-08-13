'use client'

import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Switch } from './ui/switch'

interface formType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<z.infer<any>>
  name: string
  label: string
  description?: string
  options?: { value: string; label: string }[]
  type?: string
}

export const InputForm = ({ form, name, label, type }: formType) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={label} {...field} type={type} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const AddInputForm = ({ form, name, label }: formType) => {
  const addIngredient = () => {
    const currentIngredient = form.watch('ingredient')
    if (currentIngredient.trim() == '') {
      alert('입력해주세요')
      return
    }

    const existingIngredients = form.getValues('ingredients') || []

    if (existingIngredients.includes(currentIngredient)) {
      alert('이미 추가된 재료입니다.')
      return
    }
    const updatedIngredients = [...existingIngredients, currentIngredient]

    form.setValue('ingredients', updatedIngredients)
    form.resetField('ingredient')
  }
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex gap-4">
            <FormControl>
              <Input placeholder={label} {...field} />
            </FormControl>
            <Button type="button" onClick={addIngredient}>
              식재료 추가하기
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const ToggleForm = ({
  form,
  name,
  label,
  description = '',
}: formType) => (
  <div className="space-y-4">
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm gap-8">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
)

export const SelectForm = ({
  form,
  name,
  label,
  options = [],
  description = '',
}: formType) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={description} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options?.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
)
