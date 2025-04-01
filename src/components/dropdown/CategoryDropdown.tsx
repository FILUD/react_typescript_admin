import { useEffect, useState } from "react";
import { getAllCategory } from "../../services/CategorySv";
import { CategoryType } from "../types/ProductType";
import { AutoComplete } from "antd";

interface CategoryDropdownProps {
    onSelect: (value: CategoryType) => void;
    selectedCategoryId?: number; 
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ 
    onSelect, 
    selectedCategoryId 
}) => {
    const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);
    const [options, setOptions] = useState<{ value: string; label: string; category: CategoryType }[]>([]);
    const [searchText, setSearchText] = useState("");
    const [defaultValue, setDefaultValue] = useState<string>("");

    const getCateData = async () => {
        try {
            const response = await getAllCategory();
            setCategoriesData(response.data.categories);
            
            const mappedOptions = response.data.categories.map((category: CategoryType) => ({
                value: category.name,
                label: category.name,
                category: category
            }));
            
            setOptions(mappedOptions);

            if (selectedCategoryId) {
                const selectedCategory = response.data.categories.find(
                    (c: CategoryType) => c.category_id === selectedCategoryId
                );
                if (selectedCategory) {
                    setDefaultValue(selectedCategory.name);
                }
            } else if (response.data.categories.length > 0) {
                const defaultCategory = response.data.categories[0];
                setDefaultValue(defaultCategory.name);
                onSelect(defaultCategory);
            }
        } catch (error: any) {
            console.error(error.data?.message || "Failed to fetch categories");
        }
    };

    const handleSearch = (searchText: string) => {
        setSearchText(searchText);
        if (!searchText) {
            setOptions(categoriesData.map(category => ({
                value: category.name,
                label: category.name,
                category: category
            })));
        } else {
            const filtered = categoriesData.filter(category =>
                category.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setOptions(filtered.map(category => ({
                value: category.name,
                label: category.name,
                category: category
            })));
        }
    };

    const handleSelect = (_value: string, option: any) => {
        onSelect(option.category);
    };

    useEffect(() => {
        getCateData();
    }, [selectedCategoryId]);

    return (
        <div className="flex flex-col gap-2">
            <p>* Select Category</p>
            <AutoComplete
                options={options}
                style={{ width: "100%" }}
                onSelect={handleSelect}
                onSearch={handleSearch}
                placeholder="Search Category..."
                allowClear
                value={defaultValue} 
            />
        </div>
    );
};