
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Type } from 'lucide-react';

export const FontSelector = ({ selectedFont, setSelectedFont, fontOptions }) => {
  return (
    <div>
      <Label htmlFor="font-select" className="text-md sm:text-lg font-medium text-pink-600 flex items-center">
        <Type size={20} className="mr-2 text-pink-500" />
        Escolha a Fonte da Mensagem:
      </Label>
      <Select value={selectedFont} onValueChange={setSelectedFont}>
        <SelectTrigger id="font-select" className="w-full mt-2 border-pink-300 focus:border-pink-500 focus:ring-pink-500">
          <SelectValue placeholder="Selecione uma fonte" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fontes Disponíveis</SelectLabel>
            {fontOptions.map(font => (
              <SelectItem key={font.value} value={font.value} className={font.className}>
                {font.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
  