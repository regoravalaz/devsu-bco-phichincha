import { TestBed } from "@angular/core/testing";

import { ProductService } from "./product.service";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";

describe("ProductServiceService", () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ProductService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", [
      "get",
      "post",
      "put",
      "delete",
    ]);
    TestBed.configureTestingModule({});
    service = new ProductService(httpClientSpy);
  });

  it("Getting list of products", () => {
    const testProducts = [
      {
        id: "0000",
        name: "Unbranded Rubber Chips",
        description:
          "The beautiful range of Apple Natural\u00E9 that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
        logo: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1141.jpg",
        date_release: "2023-10-07T09:54:12.480Z",
        date_revision: "2024-01-10T22:16:05.058Z",
      },
      {
        id: "0001",
        name: "Refined Frozen Ball",
        description:
          "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
        logo: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/585.jpg",
        date_release: "2024-08-19T23:50:07.568Z",
        date_revision: "2025-01-14T08:00:24.603Z",
      },
    ];

    httpClientSpy.get.and.returnValue(of(testProducts));

    service.fetch().subscribe((result) => {});
  });
});
