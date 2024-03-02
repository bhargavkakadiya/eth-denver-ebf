import React from "react";
import ReviewCard from "./Card";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const MyCreatedProjects = ({ address }: { address: string }) => {
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { data: myProjects } = useScaffoldContractRead({
    contractName: "EBF",
    functionName: "getProjectsByUser",
    args: [address],
  });



  const handlePhosphorAirdrop = async (project: any) => {
    setLoading(true);
  

    // create collection
    const url = "https://admin-api.phosphor.xyz/v1/collections";
    const body = {
      name: project.projectName + project.projectDescription,
      description: project.projectDescription,
      media: {
        thumbnail_image_url:
          "https://nftprodstorage.blob.core.windows.net/public/QmSdxwBWr19pGzZfDsS3PPkdBuVF1mfWAFnhVXAdN2CYbr/phosphor-collection-logo.png",
      },
      deployment_request: {
        network_id: 59140,
        type: "PLATFORM",
        token_id_assignment_strategy: "AUTOMATIC",
        platform: {
          variant: "FlexibleERC721",
          symbol: "NNN",
          owner: "0x52fA3cD7C8926CF515a454658A27d710CF447b2f",
        },
      },
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Phosphor-Api-Key": `${process.env.NEXT_PUBLIC_PHOSPHOR_API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.error("Failed to create collection, airdrop seems to be already done");
      setErrorMessage("Failed to create collection, airdrop seems to be already done");
    }
    const collection = await response.json();
  
    const collectionId = collection.id;

    //check collection deployment status
    //{{Admin_Api_Base_Url}}/v1/collections/1dbb06fd-6b51-412b-8181-8843c3171dfa/deployment-request
    let status;
    do {
      const urlStatus = `https://admin-api.phosphor.xyz/v1/collections/${collectionId}/deployment-request`;
      const responseStatus = await fetch(urlStatus, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Phosphor-Api-Key": `${process.env.NEXT_PUBLIC_PHOSPHOR_API_KEY}`,
        },
      });
      status = await responseStatus.json();

      if (status.status !== "SUCCESS") {
        // Wait for a while before checking the status again
        await new Promise(resolve => setTimeout(resolve, 3000)); // wait for 3 seconds
      }
    } while (status.status !== "SUCCESS");

    // add new items to collection
    const urlItems = "https://admin-api.phosphor.xyz/v1/items/bulk";
    const n = 4; // Replace with the number of items you want to create
    const items = [];

    for (let i = 1; i <= n; i++) {
      items.push({
        collection_id: collectionId,
        attributes: {
          title: `NFT #${i}`,
          description: "OG Attestors",
          attestors: "OG",
          image_url:
            "https://nftprodstorage.blob.core.windows.net/public/QmWJVNmDjj32PPvWyBNRrvT4MEhbEpX1vzsoctteRRcnsq/phosphor-nft-badge-1.png",
        },
      });
    }

    const bodyItems = {
      items: items,
    };
    const responseItems = await fetch(urlItems, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Phosphor-Api-Key": `${process.env.NEXT_PUBLIC_PHOSPHOR_API_KEY}`,
      },
      body: JSON.stringify(bodyItems),
    });
    const itemsResponse = await responseItems.json();


    await new Promise(resolve => setTimeout(resolve, 3000)); // wait for 3 seconds

    // lock all items
    // {{Admin_Api_Base_Url}}/v1/items/lock
    const urlLock = "https://admin-api.phosphor.xyz/v1/items/lock";
    const bodyLock = {
      collection_id: collectionId,
    };
    const responseLock = await fetch(urlLock, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Phosphor-Api-Key": `${process.env.NEXT_PUBLIC_PHOSPHOR_API_KEY}`,
      },
      body: JSON.stringify(bodyLock),
    });
    const lockResponse = await responseLock.json();
    

    // airdrop all items
    // {{Admin_Api_Base_Url}}/v1/mint-requests

    const itemIds = lockResponse.lock_outputs.map((item: { item_id: any }) => item.item_id);
    const urlAirdrop = "https://admin-api.phosphor.xyz/v1/mint-requests";

    const requests = itemIds.map(async (itemId: any) => {
      const bodyAirdrop = {
        item_id: itemId,
        quantity: "1",
        to_address: "0x52fA3cD7C8926CF515a454658A27d710CF447b2f",
      };

      const responseAirdrop = await fetch(urlAirdrop, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Phosphor-Api-Key": `${process.env.NEXT_PUBLIC_PHOSPHOR_API_KEY}`,
        },
        body: JSON.stringify(bodyAirdrop),
      });

      const airdropResponse = await responseAirdrop.json();
  
    });

    await Promise.all(requests);
  };

  const onAirdropAll = async (project: any) => {

    handlePhosphorAirdrop(project);
    setLoading(false);
  };

  return (
    <>
      <div>MyCreatedProjects</div>

      <div className="mt-10 flex flex-col-3">
        {myProjects &&
          myProjects.map((project: any, index: number) => {
            return (
              <div className="flex flex-col" key={index}>
                <ReviewCard
                  name={project.projectName}
                  desc={project.projectDescription}
                  onSubmit={onAirdropAll}
                  project={project}
                />

                {loading &&  "Loading..." }
                {errorMessage && <div>{errorMessage}</div>}
              </div>
            );
          })}
      </div>
    </>
  );
};
