import { Text_Attribute, Text_Data, Text_Icon, Text_Main } from "./text";
import { Button_Attribute, Button_Data, Button_Main, Button_Icon } from "./button";

export default {
    views: [
        {
          name: "文本",
          description: "",
          group: "自定义组件",
          type: "text",
          icon: Text_Icon,
          size: { width: 100, height: 40 },
          Main: Text_Main,
          Attribute: Text_Attribute,
          Data: Text_Data,
        },
        {
          name: "按钮",
          description: "",
          group: "自定义组件",
          type: "button",
          icon: Button_Icon,
          size: { width: 100, height: 40 },
          Main: Button_Main,
          Attribute: Button_Attribute,
          Data: Button_Data,
        }
    ],
  };