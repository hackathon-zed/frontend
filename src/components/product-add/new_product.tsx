

'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoAdd, IoTrash } from 'react-icons/io5';

const AddProduct = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [saleStartDate, setSaleStartDate] = useState<Date | null>(null);
  const [saleEndDate, setSaleEndDate] = useState<Date | null>(null);
  const [attributes, setAttributes] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const onSubmit = (data: any) => {
    console.log({ ...data, attributes, images, saleStartDate, saleEndDate });
    reset();
    setAttributes([]);
    setImages([]);
    setSaleStartDate(null);
    setSaleEndDate(null);
  };

  const addAttribute = () => {
    setAttributes([...attributes, '']);
  };

  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  const handleAttributeChange = (value: string, index: number) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[index] = value;
    setAttributes(updatedAttributes);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Product name is required' })}
            className={`w-full px-3 py-2 border rounded focus:ring-2 ${
              errors.name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {errors.name?.message && <span className="text-sm text-red-500">{errors.name.message as string}</span>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className={`w-full px-3 py-2 border rounded focus:ring-2 ${
              errors.description ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {errors.description && <span className="text-sm text-red-500">{String(errors.description.message)}</span>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required', min: 0 })}
            className={`w-full px-3 py-2 border rounded focus:ring-2 ${
              errors.price ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          />
          {errors.price && <span className="text-sm text-red-500">{Math.abs(Number(errors.price.message))}</span>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className={`w-full px-3 py-2 border rounded focus:ring-2 ${
              errors.category ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
            }`}
          >
            <option value="">Select Category</option>
            <option value="cat1">Category 1</option>
            <option value="cat2">Category 2</option>
          </select>
          {errors.category && <span className="text-sm text-red-500">{String(errors.category.message)}</span>}
        </div>

        {/* Attributes */}
        <div>
          <label className="block text-sm font-medium mb-1">Attributes</label>
          {attributes.map((attr, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={attr}
                onChange={(e) => handleAttributeChange(e.target.value, index)}
                className="flex-1 px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={() => removeAttribute(index)}
                className="text-red-500 hover:text-red-700"
              >
                <IoTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAttribute}
            className="mt-2 text-blue-500 hover:text-blue-700 flex items-center"
          >
            <IoAdd className="mr-1" /> Add Attribute
          </button>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border rounded"
          />
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                >
                  <IoTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sale Dates */}
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sale Start Date</label>
            <DatePicker
              selected={saleStartDate}
              onChange={setSaleStartDate}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sale End Date</label>
            <DatePicker
              selected={saleEndDate}
              onChange={setSaleEndDate}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded hover:from-blue-600 hover:to-blue-700"
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;
