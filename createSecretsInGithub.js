import { Octokit } from 'octokit';
import sodium from 'libsodium-wrappers';
import {
  token,
  firstKey,
  firstKeyId,
  secondKeyId,
  secondKey,
} from './secret.js';

const octokit = new Octokit({ auth: token });

const repoId = '607198823';

async function run() {
  for (let i = 1; i <= 100; i += 1) {
    await octokit.rest.actions.createOrUpdateEnvironmentSecret({
      encrypted_value: await encode(`SECOND_SECRET_${i}`),
      environment_name: 'second',
      key_id: secondKeyId,
      repository_id: repoId,
      secret_name: `SECOND_SECRET_${i}`,
    });
    console.log(`Created: SECOND_SECRET_${i}`);
  }

  // const result = await octokit.rest.actions.getEnvironmentPublicKey({
  //   environment_name: 'second',
  //   repository_id: repoId,
  // });
  // console.log(result);
}

run();

/**
 *
 * @param {string} secret
 */
async function encode(secret) {
  await sodium.ready;
  const key = secondKey; // replace with the Base64 encoded public key
  // Convert Secret & Base64 key to Uint8Array.
  let binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
  let binsec = sodium.from_string(secret);

  //Encrypt the secret using LibSodium
  let encBytes = sodium.crypto_box_seal(binsec, binkey);

  // Convert encrypted Uint8Array to Base64
  return sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);
}
