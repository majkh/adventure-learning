
import Product from "@/models/ProductModel.ts";

export const mockProducts: Array<Product> = [
    {
        Id: "1",
        Name: "Product 1",
        Quantity: 123,
        Price: 101,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."
    },
    {
        Id: "2",
        Name: "Product 2",
        Quantity: 123,
        Price: 102,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."

    },
    {
        Id: "3",
        Name: "Product 3",
        Quantity: 123,
        Price: 103,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."

    },
    {
        Id: "4",
        Name: "Product 4",
        Quantity: 123,
        Price: 95,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."

    },
    {
        Id: "5",
        Name: "Product 1",
        Quantity: 123,
        Price: 101,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."

    },
    {
        Id: "6",
        Name: "Product 2",
        Quantity: 123,
        Price: 102,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."

    },
    {
        Id: "7",
        Name: "Product 3",
        Quantity: 123,
        Price: 103,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."

    },
    {
        Id: "8",
        Name: "Product 4",
        Quantity: 123,
        Price: 95,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."

    }
];


export const mockBikeProducts: Array<Product> = [
    {
        Id: "1",
        Name: "Bike 1",
        Quantity: 123,
        Price: 101,
        Description: "Suitable for any type of riding, on or off-road. Fits any budget. Smooth-shifting with a comfortable ride."
    },
    {
        Id: "2",
        Name: "Bike 2",
        Quantity: 123,
        Price: 102,
        Description: "This bike delivers a high-level of performance on a budget. It is responsive and maneuverable, and offers peace-of-mind when you decide to go off-road."
    },
    {
        Id: "3",
        Name: "Bike 3",
        Quantity: 123,
        Price: 103,
        Description: "This bike delivers a high-level of performance on a budget. It is responsive and maneuverable, and offers peace-of-mind when you decide to go off-road."
    },
    {
        Id: "4",
        Name: "Bike 4",
        Quantity: 123,
        Price: 95,
        Description: "This bike delivers a high-level of performance on a budget. It is responsive and maneuverable, and offers peace-of-mind when you decide to go off-road."
    },
    {
        Id: "5",
        Name: "Bike 1",
        Quantity: 123,
        Price: 101,
        Description: "This bike delivers a high-level of performance on a budget. It is responsive and maneuverable, and offers peace-of-mind when you decide to go off-road."
    },
    {
        Id: "6",
        Name: "Bike 2",
        Quantity: 123,
        Price: 102,
        Description: "This bike delivers a high-level of performance on a budget. It is responsive and maneuverable, and offers peace-of-mind when you decide to go off-road."
    },
    {
        Id: "7",
        Name: "Bike 3",
        Quantity: 123,
        Price: 103,
        Description: "This bike delivers a high-level of performance on a budget. It is responsive and maneuverable, and offers peace-of-mind when you decide to go off-road."
    },
    {
        Id: "8",
        Name: "Bike 4",
        Quantity: 123,
        Price: 95,
        Description: "This bike delivers a high-level of performance on a budget. It is responsive and maneuverable, and offers peace-of-mind when you decide to go off-road."
    }
];

export const productCategories = [{
    Id: 0,
    Name: 'All',
    SubCategories: [],
    Active: false
}, {
    Id: 1,
    Name: 'Bikes',
    SubCategories: [{ Id: 1, Name: 'Mountain Bikes' }, { Id: 2, Name: 'Road Bikes' }, { Id: 3, Name: 'Touring Bikes' }, { Id: 4, Name: 'City Bikes' }],
    Active: false
}]