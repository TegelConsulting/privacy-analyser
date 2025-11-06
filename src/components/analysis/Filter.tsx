"use Client"
import { Category_Label } from "@/lib/mock/sum-cat/Category_Label";
import { Category } from "@/lib/types/Category";
import { useState } from "react";

export const Filter = () => {
    const [filter, setFilter] = useState<Category[]>([]);
    
    const toggleFilter = (cat: Category) => {
        setFilter(prev => 
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        )
    }
    
    return (
                    <section className="filter flex items-center gap-4 mt-3">
                        <label className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                checked={filter.includes("GDPR")}
                                onChange={() => toggleFilter("GDPR")}
                            />
                            {Category_Label.GDPR}
                        </label>
                        <label className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                checked={filter.includes("W3C")}
                                onChange={() => toggleFilter("W3C")}
                            />
                            {Category_Label.W3C}
                        </label>
                        <label className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                checked={filter.includes("Accessibility")}
                                onChange={() => toggleFilter("Accessibility")}
                            />
                            {Category_Label.Accessibility}    
                        </label>
                        <button type="button" onClick={() => setFilter([])} className="text-sm underline">
                            Rensa filter
                        </button>
                    </section>
    )
}