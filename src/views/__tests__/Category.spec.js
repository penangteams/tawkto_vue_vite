/** @format */

import { fetchCatDatas } from "@/services";
import { describe, test, vi, expect, beforeEach } from "vitest";
import axios from "axios";

vi.mock("axios");

describe("cat Service", () => {
  const catsMock = [{ title: "Getting Started" }, { title: "Integrations" }];

  beforeEach(() => {
    axios.get.mockClear();
  });

  describe("fetchCatDatas", () => {
    test("makes a GET request to fetch categories", async () => {
      axios.get.mockResolvedValue({
        data: catsMock,
      });
      const cats = await fetchCatDatas();

      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8000/categories"
      );
      expect(cats).toEqual(catsMock);
    });
  });
});
