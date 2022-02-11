const addTaskSchema = {
  type: "object",
  required: ["note", "date", "startTime", "endTime"],
  additionalProperties: false,
  properties: {
    note: {
      type: "string",
    },
    date: {
      type: "string",
      format: "date",
    },
    startTime: {
      pattern: "^([0-1][0-9]|2[0-3]):[0-5][0-9]$",
      type: ["string", "null"],
    },
    endTime: {
      pattern: "^([0-1][0-9]|2[0-3]):[0-5][0-9]$",
      type: ["string", "null"],
    },
  },
};

const updateTaskSchema = {
  type: "object",
  required: ["_id", "note", "date", "startTime", "endTime"],
  additionalProperties: false,
  properties: {
    _id: { type: "string" },
    note: {
      type: "string",
    },
    date: {
      type: "string",
      format: "date",
    },
    startTime: {
      pattern: "^([0-1][0-9]|2[0-3]):[0-5][0-9]$",
      type: ["string", "null"],
    },
    endTime: {
      pattern: "^([0-1][0-9]|2[0-3]):[0-5][0-9]$",
      type: ["string", "null"],
    },
  },
};

module.exports = { addTaskSchema, updateTaskSchema };
