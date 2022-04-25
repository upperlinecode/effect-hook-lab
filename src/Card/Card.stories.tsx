import Card, { CardProps } from "./Card";
import { Story } from "@storybook/react";

export default {
  title: "Card",
  component: Card,
};

const Template: Story<CardProps> = (args) => <Card {...args} />;

export const BasicCard = Template.bind({});
BasicCard.args = {
  data: {
    id: 121,
    answer: "Bulbasaur",
    question:
      "The Japanese name for this grass-type pokemon, Fushigidane, is a pun on the phrase 'strange seed.'",
    value: "200",
  },
  
};
