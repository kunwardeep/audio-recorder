import { ICustomersData } from "../types";

export const RECORDINGS = {
  id: 1,
  name: "User Session monday",
  created_at: 1741077996965,
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sagittis non purus a finibus. Sed efficitur urna volutpat est luctus, sit amet hendrerit neque semper. Fusce eget purus libero. Morbi vehicula urna magna, et malesuada elit dictum vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin pharetra congue finibus. Fusce finibus pulvinar ante eget aliquet. Aliquam et massa dapibus, consequat justo varius, ultrices lorem. Sed non erat sollicitudin, faucibus sapien sit amet, dapibus augue.",
};

const recording2 = {
  id: 2,
  name: "User Session tuesday",
  created_at: 1741077996965,
  notes:
    "Mauris commodo risus eget massa vestibulum rhoncus. Nulla venenatis iaculis massa, a sodales ligula consectetur id. Cras mattis, erat at cursus tempor, risus enim bibendum nisi, ac convallis urna nisl non magna. Donec vehicula et odio quis rutrum. Pellentesque varius orci sed pellentesque mollis. Donec vel metus dictum, efficitur enim vel, placerat ipsum. Praesent a molestie tellus, in euismod neque. Nunc congue, ligula in viverra ullamcorper, erat tortor eleifend lorem, nec posuere augue massa eu elit. Vestibulum pharetra, elit eu elementum sagittis, magna ante cursus dui, id vulputate arcu odio rutrum odio. Curabitur sed quam nec urna pretium efficitur. Proin eget tellus quis leo consectetur sodales at at urna. Nulla fringilla ullamcorper nisl vitae cursus. Sed nec mattis odio, dictum pellentesque quam. Pellentesque iaculis vehicula erat, vel fringilla lorem porta ac. Integer sed ante sit amet nibh semper porta. Nunc a egestas urna.",
};

const recording3 = {
  id: 3,
  name: "User Session wednesday",
  created_at: 1741077996965,
  notes:
    "Nulla semper mi sed neque lobortis porta. Suspendisse pretium sed orci eget euismod. Praesent in dignissim nibh. Nulla facilisi. Ut et erat mattis, lacinia eros ac, efficitur turpis. Donec suscipit ultricies magna vitae mollis. Nullam eu dignissim nisl, vel blandit urna. Etiam luctus lacus ante, et auctor erat porttitor sit amet. Mauris eleifend mi quis vestibulum gravida. Nam mattis quam et leo sodales euismod. Nam eu est mi. Morbi rhoncus leo condimentum nisi ultrices fermentum. Pellentesque lobortis, metus eu consequat lacinia, arcu lacus porttitor libero, eu aliquam magna felis a felis.",
};

const recording4 = {
  id: 4,
  name: "User Session thursday",
  created_at: 1741077996965,
  notes:
    "Donec quis sollicitudin enim. Morbi eu ipsum quis mi finibus luctus at vel enim. Cras ut metus sit amet nunc sodales consequat. Cras felis sapien, tincidunt eu felis sed, rutrum rutrum purus. In hac habitasse platea dictumst. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque ac risus non leo molestie mattis. Praesent porta nisi a velit cursus, et fringilla nisi luctus. Nunc euismod laoreet tellus, nec hendrerit nibh suscipit quis. Pellentesque placerat nisi sed felis viverra, at accumsan justo dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos",
};

const recording5 = {
  id: 5,
  name: "User Session friday",
  created_at: 1741077996965,
  notes:
    "Mauris tincidunt aliquet augue, eu posuere mi pharetra non. Quisque sagittis rhoncus mauris, eget feugiat lacus. Nullam efficitur et nisi et bibendum. Sed quis nibh orci. Morbi non leo at massa bibendum consequat non vitae orci. Aliquam erat volutpat. Nullam vestibulum eget purus vulputate ullamcorper. Vestibulum turpis tellus, blandit ac condimentum id, ultricies eu libero. Curabitur aliquam libero turpis, euismod pretium arcu feugiat vitae.",
};

export const CUSTOMERS: Array<ICustomersData> = [
  {
    id: 1,
    name: "Smith Barnes",
    recordings: [1, 2, 5],
  },
  {
    id: 2,
    name: "Angela Robmney",
    recordings: [3, 4, 5],
  },
  {
    id: 3,
    name: "Robert Cliff",
    recordings: [1, 5],
  },
  {
    id: 4,
    name: "Harminder Singh",
    recordings: [1, 3, 5],
  },
  {
    id: 5,
    name: "Parry Smith",
    recordings: [1, 2, 3, 4, 5],
  },
  {
    id: 6,
    name: "Andrew Bigger",
    recordings: [1, 2, 3, 4, 5],
  },
  {
    id: 7,
    name: "Lorane Barnes",
    recordings: [1, 2, 3, 4],
  },
  {
    id: 8,
    name: "Patty Bulus",
    recordings: [3, 4, 5],
  },
];
